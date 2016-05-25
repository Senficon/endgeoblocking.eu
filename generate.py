#!/usr/bin/env python2.7
import json
from jinja2 import Template

for lang in ['en']:
    with open('%s.html' % lang, 'w') as out:
        with open('template.html') as t:
            with open('%s.json' % lang) as f:
                out.write(Template(t.read()).render(**json.load(f)))
