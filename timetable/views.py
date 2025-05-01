from django.shortcuts import get_object_or_404, redirect, render
from .models import Timetable, ClassEntry

# Create your views here.
def index(request):
    return render(request, 'timetable/index.html')

def test(request):
    return render(request, 'timetable/test.html')

def test2(request):
    return render(request, 'timetable/test2.html')

def test3(request):
    if request.method == 'POST':
        # POSTデータを取得
        title = request.POST['title']
        timetable = Timetable.objects.create(title=title)
        return redirect('test31', timetable_id=timetable.id)
    return render(request, 'timetable/test3.html')

def test31(request, timetable_id):
    timetable = Timetable.objects.get(id=timetable_id)
    if request.method == 'POST':
        ClassEntry.objects.create(
            timetable=timetable,
            subject=request.POST['subject'],
            weekday=request.POST['weekday'],
            period=request.POST['period'],
            classroom=request.POST['classroom'],
            teacher=request.POST['teacher'],
            note=request.POST['note']
        )
        return redirect('test31', timetable_id=timetable.id)
    return render(request, 'timetable/test31.html', {'timetable': timetable})

def test4(request):
    timetables = Timetable.objects.all()
    return render(request, 'timetable/test4.html', {'timetables': timetables})

def test4_detail(request, timetable_id):
    timetable = get_object_or_404(Timetable, id=timetable_id)
    entries = ClassEntry.objects.filter(timetable=timetable)

    # キーを '月1', '火2', ... のような文字列にする
    entry_dict = {
        f"{entry.weekday}{entry.period}": entry
        for entry in entries
    }

    return render(request, 'timetable/test4_detail.html', {
        'timetable': timetable,
        'entries': entry_dict,
    })

def delete_timetable(request, timetable_id):
    timetable = get_object_or_404(Timetable, id=timetable_id)

    if request.method == 'POST':
        timetable.delete()
        return redirect('test4')  # タイトル一覧へ戻る

    return render(request, 'timetable/confirm_delete.html', {'timetable': timetable})

def edit_class(request, entry_id):
    entry = get_object_or_404(ClassEntry, id=entry_id)
    if request.method == 'POST':
        entry.subject = request.POST['subject']
        entry.weekday = request.POST['weekday']
        entry.period = request.POST['period']
        entry.classroom = request.POST['classroom']
        entry.teacher = request.POST['teacher']
        entry.note = request.POST['note']
        entry.save()
        return redirect('test4_detail', timetable_id=entry.timetable.id)
    return render(request, 'timetable/edit_class.html', {'entry': entry})

def delete_class(request, entry_id):
    entry = get_object_or_404(ClassEntry, id=entry_id)
    timetable_id = entry.timetable.id
    entry.delete()
    return redirect('test4_detail', timetable_id=timetable_id)

def filter(request):
    return render(request, 'timetable/filter.html')