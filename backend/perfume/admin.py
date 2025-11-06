from django.contrib import admin
from django.contrib.auth.models import User, Group
from django import forms
from django.core.exceptions import ValidationError
from django.utils.safestring import mark_safe
import base64

from .models import Perfume
from base.redis_manager import redis_manager


# Unregister built-in auth models
admin.site.unregister(User)
admin.site.unregister(Group)


class PerfumeForm(forms.ModelForm):
    picture = forms.ImageField(required=False)

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
                redis_manager.add_photo('perfume', str(instance.id), image_hex)
            except Exception as e:
                raise ValidationError(f"Failed to save picture: {e}")

        return instance


@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    form = PerfumeForm

    list_display = (
        'thumbnail', 'title', 'price', 'currency', 'available',
        'type', 'volume', 'sex', 'display_notes'
    )
    list_editable = ('price', 'available')
    list_filter = (
        'currency', 'type', 'volume', 'sex',
        'first_notes', 'perfume_heart', 'last_notes'
    )
    search_fields = ('title', 'description', 'first_notes', 'perfume_heart', 'last_notes')
    ordering = ('title',)
    list_per_page = 30

    fieldsets = (
        ('Main Info', {
            'fields': ('title', 'type', 'description', 'sex', 'image_preview', 'picture')
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'currency', 'available')
        }),
        ('Perfume Details', {
            'fields': ('weight', 'volume')
        }),
        ('Fragrance Notes', {
            'fields': ('first_notes', 'perfume_heart', 'last_notes')
        }),
    )

    readonly_fields = ('image_preview',)

    def thumbnail(self, obj):
        """Small thumbnail for list_display."""
        try:
            image_hex = redis_manager.get_photo('perfume', str(obj.id))
            if not image_hex:
                return ""
            if isinstance(image_hex, bytes):
                image_hex = image_hex.decode('utf-8')
            import base64
            image_bytes = bytes.fromhex(image_hex)
            base64_str = base64.b64encode(image_bytes).decode('utf-8')
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{base64_str}" '
                f'style="height:40px;width:40px;object-fit:cover;border-radius:5px;" />'
            )
        except Exception:
            return "Error loading image"

    thumbnail.short_description = "Img"
    thumbnail.allow_tags = True  # (not required in modern Django, but harmless)

    def image_preview(self, obj):
        """Larger preview in detail view."""
        if not obj or not obj.id:
            return "(save first to see image)"
        try:
            image_hex = redis_manager.get_photo('perfume', str(obj.id))
            if not image_hex:
                return "(no image)"
            if isinstance(image_hex, bytes):
                image_hex = image_hex.decode('utf-8')
            import base64
            image_bytes = bytes.fromhex(image_hex)
            base64_str = base64.b64encode(image_bytes).decode('utf-8')
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{base64_str}" '
                f'style="max-height:200px;border-radius:8px;" />'
            )
        except Exception as e:
            print("Image preview error:", e)
            return f"(error loading image: {e})"

    image_preview.short_description = "Current Picture"

    def display_notes(self, obj):
        return f"{obj.first_notes} → {obj.perfume_heart} → {obj.last_notes}"
    display_notes.short_description = "Notes Composition"

    actions = ['mark_as_unavailable', 'mark_as_available']

    def mark_as_unavailable(self, request, queryset):
        updated = queryset.update(available=0)
        self.message_user(request, f"{updated} perfume(s) marked as unavailable.")
    mark_as_unavailable.short_description = "Mark selected as unavailable"

    def mark_as_available(self, request, queryset):
        updated = queryset.update(available=10)
        self.message_user(request, f"{updated} perfume(s) marked as available (10 in stock).")
    mark_as_available.short_description = "Mark selected as available"
