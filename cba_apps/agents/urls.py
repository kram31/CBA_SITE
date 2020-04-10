from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .api import AgentViewset, AgentSkillViewset, TeamLeadViewset, TeamViewset, TeamReadViewset, TeamMemberViewset, CsatAdministratorViewset

router = routers.DefaultRouter()
router.register('api/agents', AgentViewset, 'agents')
router.register('api/agent_skills', AgentSkillViewset, 'agent_skills')
router.register('api/teamleads', TeamLeadViewset, 'teamleads')
router.register('api/cba_teams', TeamViewset, 'cba_teams')
router.register('api/cba_teams_readonly',
                TeamReadViewset, 'cba_teams_readonly')
router.register('api/cba_team_members', TeamMemberViewset, 'cba_team_members')
router.register('api/csat_admins', CsatAdministratorViewset, 'csat_admins')

urlpatterns = router.urls
