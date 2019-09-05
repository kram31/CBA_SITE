from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .api import AgentViewset, SkillViewset, TeamLeadViewset

router = routers.DefaultRouter()
router.register('api/agents', AgentViewset, 'agents')
router.register('api/skills', SkillViewset, 'skills')
router.register('api/teamleads', TeamLeadViewset, 'teamleads')

urlpatterns = router.urls
