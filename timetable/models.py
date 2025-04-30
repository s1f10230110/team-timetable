from django.db import models
from django.utils import timezone

# Create your models here.
class Timetable(models.Model):
    title = models.CharField(max_length=100, verbose_name="時間割のタイトル")

    def __str__(self):
        return self.title

class ClassEntry(models.Model):
    WEEKDAYS = [
        ('月', '月曜日'),
        ('火', '火曜日'),
        ('水', '水曜日'),
        ('木', '木曜日'),
        ('金', '金曜日'),
        ('土', '土曜日'),
        ('日', '日曜日'),
    ]

    PERIOD_CHOICES = [
        ('1', '1限'),
        ('2', '2限'),
        ('3', '3限'),
        ('4', '4限'),
        ('5', '5限'),
        ('6', '6限'),
        ('7', '7限'),
    ]

    timetable = models.ForeignKey(Timetable, on_delete=models.CASCADE, related_name='entries', verbose_name="時間割")
    subject = models.CharField(max_length=100, verbose_name="授業名")
    weekday = models.CharField(max_length=2, choices=WEEKDAYS, verbose_name="曜日")
    period = models.CharField(max_length=1, choices=PERIOD_CHOICES, verbose_name="時限")
    classroom = models.CharField(max_length=100, blank=True, verbose_name="教室")
    teacher = models.CharField(max_length=100, blank=True, verbose_name="教員")
    note = models.TextField(blank=True, verbose_name="メモ")

    class Meta:
        unique_together = ('timetable', 'weekday', 'period')  # 同じ時間帯に複数の授業が入らないようにする

    def __str__(self):
        return f"{self.subject}（{self.weekday}{self.period}限）"

