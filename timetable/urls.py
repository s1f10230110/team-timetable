from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('timetable_create/', views.timetable_create, name='timetable_create'),

    path('timetable_list/', views.timetable_list, name='timetable_list'),
    path('timetable_detail/<int:timetable_id>/', views.timetable_detail, name='timetable_detail'),
    path('timetable/<int:timetable_id>/delete/', views.timetable_delete, name='timetable_delete'),

    path('class_register/<int:timetable_id>/', views.class_register, name='class_register'),
    path('timetable_detail/<int:entry_id>/class_edit/', views.class_edit, name='class_edit'),
    path('test4/<int:entry_id>/delete/', views.delete_class, name='delete_class'),


]




