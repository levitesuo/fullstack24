```mermaid
---
title: New_note_in_Single_page_app_diagram
---
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser ads the newly created note to its local list.
```