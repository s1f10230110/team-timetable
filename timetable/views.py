from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'timetable/index.html')

def test(request):
    return render(request, 'timetable/test.html')

def test2(request):
    return render(request, 'timetable/test2.html')

def filter(request):
    return render(request, 'timetable/filter.html')