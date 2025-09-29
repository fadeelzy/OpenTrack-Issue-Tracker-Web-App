from django.test import TestCase
from .models import Issue
from django.contrib.auth.models import User

# Create your tests here.


class IssueModelTest(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="password123"
        )

        # Create a test issue with the reporter
        self.issue = Issue.objects.create(
            title="Login page bug",
            description="Login form throws 500 error",
            priority="high",
            status="open",
            labels="bug,frontend",
            reporter=self.user   # 👈 important fix
        )

    def test_issue_creation(self):
        """Test that issue is created with correct title"""
        self.assertEqual(self.issue.title, "Login page bug")

    def test_issue_str(self):
        """Test the string representation of issue"""
        self.assertEqual(str(self.issue), self.issue.title)

    def test_status_update(self):
        """Test updating the issue status"""
        self.issue.status = "in_progress"
        self.issue.save()
        self.assertEqual(self.issue.status, "in_progress")

    def test_labels_split(self):
        """Test splitting labels into a list"""
        labels = self.issue.labels.split(",")
        self.assertIn("bug", labels)
        self.assertIn("frontend", labels)

    def test_issue_str(self):
        """Test the string representation of issue"""
        self.assertEqual(str(self.issue), f"{self.issue.title} ({self.issue.status})")