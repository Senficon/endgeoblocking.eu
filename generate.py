#!/usr/bin/env python2.7
import json, os
from jinja2 import Template

for lang in ['en']:
    urllang = '.' if (lang=='en') else lang
    if not os.path.exists(urllang):
        os.makedirs(urllang)
    with open('%s/index.html' % urllang, 'w') as out:
        with open('template.html') as t:
            with open('%s.json' % lang) as f:
                out.write(Template(t.read()).render(**json.load(f)))
