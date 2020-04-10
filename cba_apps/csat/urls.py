from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .api import SurveyViewset, RCAViewset, DSAT_Code1Viewset, BB_Driver_Code2Viewset, BB_Driver_Code3Viewset, AccountableTeamViewset, CsatAccessRequestViewset

router = routers.DefaultRouter()
router.register('api/surveys', SurveyViewset, 'survey')
router.register('api/csat_rcas', RCAViewset, 'csat_rcas')
router.register('api/dsat_code1', DSAT_Code1Viewset, 'dsat_code1')
router.register('api/bb_driver_code2',
                BB_Driver_Code2Viewset, 'bb_driver_code2')
router.register('api/bb_driver_code3',
                BB_Driver_Code3Viewset, 'bb_driver_code3')
router.register('api/csat_accountable_team',
                AccountableTeamViewset, 'csat_accountable_team')
router.register('api/csat_access_request',
                CsatAccessRequestViewset, 'csat_access_request')


urlpatterns = router.urls
