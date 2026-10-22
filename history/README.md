# Original UBS source histories

The primary repository retains its original shared Git ancestry. These self-contained bundles also preserve the source histories alongside the grouped folders:

- `advisor-source.bundle`: primary advisor source, including the earlier client-insights commit.
- `dashboard-source.bundle`: the separate dashboard source history.

```sh
git bundle verify history/advisor-source.bundle
git clone history/advisor-source.bundle recovered-advisor
git bundle verify history/dashboard-source.bundle
git clone history/dashboard-source.bundle recovered-dashboard
```

Use the commit IDs in `SOURCES.json` to recover an exact version. Earlier repositories are retained as historical copies; they are not additional active projects.
