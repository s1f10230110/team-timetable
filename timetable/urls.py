from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.test, name='test'),
    path('test2/', views.test2, name='test2'),
    path('test3/', views.test3, name='test3'),
    path('filter/', views.filter, name='filter'),

    path('test4/', views.test4, name='test4'),
    path('test4/<int:timetable_id>/', views.test4_detail, name='test4_detail'),
    path('timetable/delete/<int:timetable_id>/', views.delete_timetable, name='delete_timetable'),

    path('test4/<int:timetable_id>/add_class/', views.test31, name='test31'),
    path('test4/<int:entry_id>/edit/', views.edit_class, name='edit_class'),
    path('test4/<int:entry_id>/delete/', views.delete_class, name='delete_class'),


]




