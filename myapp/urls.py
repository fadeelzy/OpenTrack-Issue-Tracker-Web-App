from django.urls import path
from . import views

urlpatterns = [
    path('', views.auth_view, name='auth'),
    path('signup', views.signup_view, name='signup'),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('add-issue/', views.add_issue, name="add-issue"),
    path("issue-detail/<int:pk>/", views.issue_detail, name="issue-detail"),
    path('issue-detail/', views.issue_detail, name="issue-detail")

]
