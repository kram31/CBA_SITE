import os
import sys
import site
from django.core.wsgi import get_wsgi_application

# add python site packages, you can use virtualenvs also
site.addsitedir(r"C:\Program Files\Python37\Lib\site-packages")

# Add the app's directory to the PYTHONPATH
sys.path.append(r"C:\Users\Mark\Desktop\Workspace\CBA_SITE\cba_apps")
sys.path.append(r"C:\Users\Mark\Desktop\Workspace\CBA_SITE\cba_apps\cba_apps")

os.environ['DJANGO_SETTINGS_MODULE'] = 'cba_apps.settings'
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cba_apps.settings")

application = get_wsgi_application()
