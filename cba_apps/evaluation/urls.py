
from django.urls import path
from .views import Home_View, Analysts_API, EvaluationList, EvaluationDetail, EvaluationCreate, EvaluationUpdate, AnalystList, AnalystDetail, AnalystCreateView, AnalystUpdate, EvaluationConfirmUpdate, EvaluationAPI, ScoreUpdate, ScoreDetail, ApplicationCreateView, ApplicationList, ApplicationDetail, ApplicationUpdate

urlpatterns = [
    path('eval', Home_View.as_view(), name='eval_home_view'),
    path('api/analysts/', Analysts_API.as_view()),
    path('api/evaluations/', EvaluationAPI.as_view()),
    path('evaluation/', EvaluationList.as_view(), name='evaluation_list'),
    path('evaluation/new/', EvaluationCreate.as_view(), name='eval_create'),
    path('evaluation/<int:pk>/', EvaluationDetail.as_view(),
         name='eval_detail_data'),
    # path('?search=<int:pk>/', EvaluationDetail.as_view(), name='eval_detail_data'),
    path('evaluation/<int:pk>/update/',
         EvaluationUpdate.as_view(), name='eval_update'),
    path('evaluation/<pk>/confirm/', EvaluationConfirmUpdate.as_view(),
         name='eval_confirm_update'),



    # Analyst
    path('analyst/', AnalystList.as_view(), name='analyst_list'),
    path('analyst/new/', AnalystCreateView.as_view(), name='analyst_create'),
    path('analyst/<pk>/', AnalystDetail.as_view(), name='analyst_detail_data'),
    path('analyst/<pk>/update/', AnalystUpdate.as_view(), name='analyst_update'),

    # Score
    path('score/<int:pk>/', ScoreDetail.as_view(), name='score_detail_data'),
    path('score/<int:pk>/update/', ScoreUpdate.as_view(), name='score_update'),

    # Application
    path('application/', ApplicationList.as_view(), name='app_list'),
    path('application/new/',
         ApplicationCreateView.as_view(success_url='/application'), name='app_create'),
    path('application/<pk>/', ApplicationDetail.as_view(), name='app_detail_data'),
    path('application/<pk>/update/',
         ApplicationUpdate.as_view(), name='app_update'),

]
