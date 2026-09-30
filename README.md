# Personal webpage

## Local preview

Run from this directory:

```sh
./scripts/preview
```

Open http://127.0.0.1:4000. Changes rebuild automatically; stop with Ctrl-C.
Use `PORT=4001 ./scripts/preview` if port 4000 is busy.
Restart the preview after changing `_config.yml`.

The script selects Homebrew Ruby on macOS and the standalone Command Line
Tools when installed. It installs missing gems into ignored `vendor/bundle`.
Ruby 4 needs the explicit `logger` dependency in the Gemfile.

To build without starting a server:

```sh
./scripts/preview --build
```

The generated site is in `_site/`. These commands do not commit or push.
