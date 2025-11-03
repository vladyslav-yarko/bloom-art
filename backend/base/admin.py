from django.contrib import admin
from django import forms

from .models import Perfume


class PerfumeForm(forms.ModelForm):
    class Meta:
        model = Perfume
        fields = '__all__'
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'cols': 60}),
        }


@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    form = PerfumeForm

    list_display = (
        'title',
        'price',
        'currency',
        'available',
        'type',
        'volume',
        'sex',
        'display_notes',
    )

    list_editable = ('price', 'available')

    list_filter = (
        'currency',
        'type',
        'volume',
        'first_notes',
        'perfume_heart',
        'last_notes',
        'sex',
    )

    search_fields = (
        'title',
        'description',
        'first_notes',
        'perfume_heart',
        'last_notes',
    )

    ordering = ('title',)

    list_per_page = 30

    fieldsets = (
        ('Main Information', {
            'fields': ('title', 'type', 'description', 'sex')
        }),
        ('Pricing and Stock', {
            'fields': ('price', 'currency', 'available')
        }),
        ('Perfume Details', {
            'fields': ('weight', 'volume')
        }),
        ('Fragrance Notes', {
            'fields': ('first_notes', 'perfume_heart', 'last_notes')
        }),
    )

    def display_notes(self, obj):
        return f"{obj.first_notes} → {obj.perfume_heart} → {obj.last_notes}"
    display_notes.short_description = "Notes Composition"

    # Add custom bulk actions
    actions = ['mark_as_unavailable', 'mark_as_available']

    def mark_as_unavailable(self, request, queryset):
        updated = queryset.update(available=0)
        self.message_user(request, f"{updated} perfume(s) marked as unavailable.")
    mark_as_unavailable.short_description = "Mark selected as unavailable"

    def mark_as_available(self, request, queryset):
        updated = queryset.update(available=10)
        self.message_user(request, f"{updated} perfume(s) marked as available (10 in stock).")
    mark_as_available.short_description = "Mark selected as available"
