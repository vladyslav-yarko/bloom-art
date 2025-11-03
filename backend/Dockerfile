ARG PYTHON_VERSION=3.11-slim


###
FROM python:${PYTHON_VERSION} AS base

LABEL maintainer="vladyslav-yarko"
LABEL org.opencontainers.image.source="https://github.com/vladyslav-yarko/bloom-art"
# LABEL org.opencontainers.image.description=Django


# Install necessary tools for uv and Python installatix`on
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates build-essential libssl-dev zlib1g-dev libbz2-dev \
    libreadline-dev libsqlite3-dev libncursesw5-dev xz-utils tk-dev libxml2-dev \
    libxmlsec1-dev libffi-dev liblzma-dev

# Install uv
ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

WORKDIR /app

# COPY --chown=django pyproject.toml .
# COPY --chown=vladyslav:vladyslav pyproject.toml .


###
FROM base AS dev

# USER root
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml uv.lock ./

RUN uv python install 3.11

RUN uv python pin 3.11

RUN uv venv --python 3.11

RUN uv sync --python 3.11

# COPY --chown=django . .
# COPY --chown=vladyslav:vladyslav . .
COPY . .

EXPOSE 8000

# USER django
# USER root
# USER devuser

ENTRYPOINT [ "uv", "run", "python" ]
CMD [ "manage.py", "runserver", "0.0.0.0:8000" ]
