# Architecture

## Submitting file from front-end

```mermaid
sequenceDiagram

Frontend ->>+ Backend: File
Backend ->> Backend: Save file to memory
Backend -->>- Frontend: 200 OK
```
