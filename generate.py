#!/usr/bin/env python2.7
import json, os
from jinja2 import Template

for lang in ['en',  'de', 'es']:
    directory = '.' if (lang=='en') else lang
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open('%s/index.html' % directory, 'w') as out:
        with open('template.html') as t:
            with open('%s.json' % lang) as f:
                output = Template(t.read()).render(**json.load(f, encoding='utf-8'))
                out.write(output.encode('utf-8'))
