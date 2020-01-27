from django.db import models


# mail, is_acknowledged?, acknowledged_by, is_resolved?, date_acknowledged
class Mail(models.Model):
    mail_id = models.CharField(editable=False, max_length=5000)
    email_subject = models.CharField(max_length=2000, blank=True)
    email_body = models.TextField(blank=True)
    sender_name = models.CharField(max_length=2000, blank=True)
    sender_email_address = models.CharField(max_length=2000, blank=True)

    acknowledged_by = models.CharField(max_length=2000)
    is_acknowledged = models.BooleanField(default=False)
    is_resolved = models.BooleanField(default=False, blank=True)
    date_acknowledged = models.CharField(max_length=2000)

    def __str__(self):
        return self.email_subject


class Mailbox_Monitor(models.Model):
    monitor_on = models.BooleanField(default=False)
    mailbox_name = models.EmailField()

    def __str__(self):
        return self.mailbox_name


# comment_entry_date, contributor_name, ccms_entry(foreign key)
class Comment(models.Model):
    entry = models.TextField()
    contributor_name = models.CharField(max_length=2000)
    comment_entry_date = models.CharField(max_length=2000)
    mail = models.ForeignKey(
        "Mail", on_delete=models.CASCADE, related_name="mails", blank=True)

    def __str__(self):
        return f"Comment for {self.mail}"


class BusinessUnit(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name
