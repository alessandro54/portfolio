from gzip import compress
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
from pathlib import Path
from functools import partial
import sys

root = Path(sys.argv[1]).resolve()
port = int(sys.argv[2])
compressed_types = {".css", ".html", ".js", ".json", ".svg", ".txt", ".xml"}


class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = Path(self.translate_path(self.path))
        if path.is_dir():
            path /= "index.html"
        if not path.is_relative_to(root) or not path.is_file():
            self.send_error(404)
            return None

        body = path.read_bytes()
        self.send_response(200)
        if path.suffix in compressed_types and "gzip" in self.headers.get("Accept-Encoding", ""):
            body = compress(body, mtime=0)
            self.send_header("Content-Encoding", "gzip")
        self.send_header("Content-Type", self.guess_type(str(path)))
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Vary", "Accept-Encoding")
        self.end_headers()
        return BytesIO(body)


ThreadingHTTPServer(("127.0.0.1", port), partial(Handler, directory=str(root))).serve_forever()
