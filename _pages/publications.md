---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---
{% if page.author and site.data.authors[page.author] %}
  {% assign author = site.data.authors[page.author] %}{% else %}{% assign author = site.author %}
{% endif %}

{% if author.googlescholar %}
  You can also find my articles on <a href="{{author.googlescholar}}">Google Scholar</a>.
{% endif %}

{% include base_path %}
## Under review/preparation
{% for post in site.preparation reversed %}
  {% include archive-single.html %}
{% endfor %}

## Peer-reviewed journal publications
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

<sup>*</sup> Equal authorship
