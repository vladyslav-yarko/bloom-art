from django.contrib import admin
from django.contrib.auth.models import User, Group
from django import forms
from django.core.exceptions import ValidationError
import base64

from .models import Perfume
from .redis_manager import redis_manager


admin.site.unregister(User)
admin.site.unregister(Group)


class PerfumeForm(forms.ModelForm):
    picture = forms.ImageField(required=True)

    class Meta:
        model = Perfume
        fields = '__all__'
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'cols': 60}),
        }

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.save()
        image = self.cleaned_data.get('picture')
        if image:
            try:
                image_bytes = image.read()
                image_hex = image_bytes.hex()
                redis_manager.add_photo('perfume', instance.id, image_hex)
            except Exception as e:
                raise ValidationError(f"Failed to save picture: {str(e)}")
        return instance


@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    form = PerfumeForm

    list_display = (
        'title', 'price', 'currency', 'available',
        'type', 'volume', 'sex', 'display_notes', 'picture_preview'
    )
    list_editable = ('price', 'available')
    list_filter = ('currency', 'type', 'volume', 'sex', 'first_notes', 'perfume_heart', 'last_notes')
    search_fields = ('title', 'description', 'first_notes', 'perfume_heart', 'last_notes')
    ordering = ('title',)
    list_per_page = 30

    fieldsets = (
        ('Main Info', {'fields': ('title', 'type', 'description', 'sex', 'picture')}),
        ('Pricing & Stock', {'fields': ('price', 'currency', 'available')}),
        ('Perfume Details', {'fields': ('weight', 'volume')}),
        ('Fragrance Notes', {'fields': ('first_notes', 'perfume_heart', 'last_notes')}),
    )

    def display_notes(self, obj):
        return f"{obj.first_notes} → {obj.perfume_heart} → {obj.last_notes}"
    display_notes.short_description = "Notes Composition"


    def picture_preview(self, obj):
        image_hex = redis_manager.get_photo('perfume', obj.id)
        if image_hex:
            image_bytes = bytes.fromhex(image_hex)
            data_uri = base64.b64encode(image_bytes).decode()
            return f'<img src="data:image/png;base64,{data_uri}" width="50"/>'
        return "-"
    picture_preview.allow_tags = True
    picture_preview.short_description = "Picture"

    actions = ['mark_as_unavailable', 'mark_as_available']

    def mark_as_unavailable(self, request, queryset):
        updated = queryset.update(available=0)
        self.message_user(request, f"{updated} perfume(s) marked as unavailable.")
    mark_as_unavailable.short_description = "Mark selected as unavailable"

    def mark_as_available(self, request, queryset):
        updated = queryset.update(available=10)
        self.message_user(request, f"{updated} perfume(s) marked as available (10 in stock).")
    mark_as_available.short_description = "Mark selected as available"
