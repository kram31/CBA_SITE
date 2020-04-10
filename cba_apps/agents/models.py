from django.db import models
from django.contrib.auth.models import User


class Agent(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    operator_lan_id = models.CharField(
        'Operator Lan ID', max_length=100, primary_key=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    wave = models.CharField(max_length=100, blank=True, null=True)
    teams = models.ManyToManyField("Team")

    def __str__(self):
        return self.operator_lan_id


class AgentSkill(models.Model):
    name = models.CharField(
        max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.name


class TeamLead(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name="team_lead_users", blank=True, null=True)

    def __str__(self):
        return f"Team Lead - {self.user.username}"


class Team(models.Model):

    agent_skill = models.ForeignKey(AgentSkill, on_delete=models.CASCADE,
                                    blank=True, null=True, related_name="team_agent_skills")

    team_leads = models.ManyToManyField(TeamLead)

    def __str__(self):
        return f"Team {self.agent_skill.name}"


class TeamMember(models.Model):

    agent = models.ForeignKey(Agent, on_delete=models.CASCADE,
                              blank=True, null=True, related_name="team_member_agents")

    team = models.ForeignKey(Team, on_delete=models.CASCADE,
                             blank=True, null=True, related_name="team_member_teams")


class CsatAdministrator(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name="csat_administrator_users", blank=True, null=True)

    def __str__(self):
        return f"CSAT Admin - {self.user.username}"
