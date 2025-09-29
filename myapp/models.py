from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Issue(models.Model):
    ISSUE_TYPES = [
        ("bug", "Bug"),
        ("feature", "Feature Request"),
        ("enhancement", "Enhancement"),
        ("task", "Task"),
    ]

    PRIORITY_LEVELS = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=ISSUE_TYPES, default="bug")
    priority = models.CharField(max_length=20, choices=PRIORITY_LEVELS, default="medium")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")

    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reported_issues")
    assignee = models.CharField(max_length=100, blank=True, null=True)

    labels = models.CharField(max_length=255, blank=True, null=True)  # comma-separated labels

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"