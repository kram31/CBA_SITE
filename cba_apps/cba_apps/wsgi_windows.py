import os
import sys
import site
from django.core.wsgi import get_wsgi_application
activate_this = 'C:/Users/Mark/.virtualenvs/CBA_SITE-nNEymgmn/Scripts/activate_this.py'
# execfile(activate_this, dict(__file__=activate_this))
exec(open(activate_this).read(), dict(__file__=activate_this))


# add python site packages, you can use virtualenvs also
site.addsitedir(
    r"C:\Users\Mark\.virtualenvs\CBA_SITE-nNEymgmn\Lib\site-packages")

# Add the app's directory to the PYTHONPATH
sys.path.append(r"C:\Users\Mark\Desktop\cba_site_merge\CBA_SITE\cba_apps")
sys.path.append(
    r"C:\Users\Mark\Desktop\cba_site_merge\CBA_SITE\cba_apps\cba_apps")

os.environ['DJANGO_SETTINGS_MODULE'] = 'cba_apps.settings'
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cba_apps.settings")

application = get_wsgi_application()
