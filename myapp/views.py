from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Issue

# Create your views here.
def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username").strip()
        email = request.POST.get("email").strip()
        password = request.POST.get("password")

        # Basic validation
        if not username or not email or not password:
            messages.error(request, "All fields are required.")
            return redirect("signup")

        if User.objects.filter(username=username).exists():
            messages.error(request, "⚠️ Username already taken")
            return redirect("signup")

        if User.objects.filter(email=email).exists():
            messages.error(request, "⚠️ Email already registered")
            return redirect("signup")

        # Create new user
        User.objects.create_user(username=username, email=email, password=password)

        # Success message + redirect
        messages.success(request, "✅ Account created successfully! Please sign in.")
        return redirect("auth")  

    return render(request, "signup.html")


# Sign-in view
def auth_view(request):
    if request.method == "POST":
        email = request.POST.get("email").strip()
        password = request.POST.get("password")

        # Check if email exists
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            messages.error(request, "❌ Invalid email or password")
            return redirect("auth")

        # Authenticate
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f"👋 Welcome back, {user.username}!")
            return redirect("dashboard")  # after sign in, go to dashboard
        else:
            messages.error(request, "❌ Invalid email or password")
            return redirect("auth")

    return render(request, "auth.html")

@login_required(login_url='auth')
def dashboard(request):
    # Only show issues reported by this user
    issues = Issue.objects.filter(reporter=request.user).order_by("-created_at")

    # Filters
    status = request.GET.get("status")
    priority = request.GET.get("priority")
    q = request.GET.get("q")

    if status and status != "all":
        issues = issues.filter(status=status)
    if priority and priority != "all":
        issues = issues.filter(priority=priority)
    if q:
        issues = issues.filter(title__icontains=q)

    context = {
        "issues": issues,
        "total_count": issues.count(),
        "open_count": issues.filter(status="open").count(),
        "progress_count": issues.filter(status="in_progress").count(),
        "resolved_count": issues.filter(status="resolved").count(),
    }
    return render(request, "dashboard.html", context)

@login_required(login_url='auth')
def add_issue(request):
    if request.method == "POST":
        title = request.POST.get("title")
        description = request.POST.get("description")
        issue_type = request.POST.get("type")
        priority = request.POST.get("priority")
        assignee = request.POST.get("assignee")
        labels = request.POST.get("labels")

        # Save issue
        Issue.objects.create(
            title=title,
            description=description,
            type=issue_type,
            priority=priority,
            assignee=assignee,
            labels=labels,
            reporter=request.user,
        )
        messages.success(request, "Issue created successfully!")
        return redirect("dashboard")

    return render(request, "add-issue.html")


@login_required(login_url='auth')
def issue_detail(request, pk): 
    issue = get_object_or_404(Issue, pk=pk)

    if request.method == "POST":
        new_status = request.POST.get("status")
        if new_status in dict(Issue.STATUS_CHOICES).keys():
            issue.status = new_status
            issue.save()
            messages.success(request, f" Status updated to {issue.get_status_display()}")
            return redirect("issue-detail", pk=pk)

    # Split labels safely (in case it's None or empty)
    labels = issue.labels.split(",") if issue.labels else []
    labels = [label.strip() for label in labels if label.strip()]

    return render(request, "issue-detail.html", {
        "issue": issue,
        "labels": labels
    })