# jd-wedding.github.io

# Next Steps:
- Server Online Erreichbar machen.
- DB mit Website verknüpfen


### Netzwerkdiagramm

graph TD
    %% Definition der Elemente (Nodes)
    DS[Debian Server\nIP: 192.170.170.228]
    PPS[Public Proxy Server]
    GHS[Git Website Host Server\nGitHub Pages/etc.]

    %% Definition der Verbindungen (Edges) und des Flusses
    subgraph Internet
        GHS --> PPS
        User -- Greift zu auf --> GHS
    end

    subgraph Ihr Netzwerk
        PPS -- Verbindet sich mit --> DS
    end

    %% Beschreibung der Interaktion
    style DS fill:#f9f,stroke:#333,stroke-width:2px
    style PPS fill:#ccf,stroke:#333,stroke-width:2px
    style GHS fill:#cfc,stroke:#333,stroke-width:2px
    style User fill:#ffc,stroke:#333,stroke-width:2px
