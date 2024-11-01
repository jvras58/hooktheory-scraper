FROM node:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git curl zsh bash openssh-client make gcc musl-dev linux-headers-amd64 \
    ldap-utils libaio-dev unzip chromium libnss3 libfreetype6 libharfbuzz0b \
    ca-certificates fonts-freefont-ttf fonts-noto-color-emoji libatk1.0-0 \
    libatk-bridge2.0-0 libcups2 libxcomposite1 libxrandr2 libxdamage1 \
    libxkbcommon0 libgbm1 libpango-1.0-0 libasound2 && \
    rm -rf /var/lib/apt/lists/*

# Instala o Starship
RUN curl -fsSL https://starship.rs/install.sh | sh -s -- --yes

# Define o ZSH como shell padrão
RUN chsh -s /bin/zsh root

# Define variáveis de ambiente padões
ENV PATH="/root/.local/bin:${PATH}"
ENV ZSH_THEME starship

# Define variáveis de ambiente para o Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    CHROME_BIN=/usr/bin/chromium \
    CHROME_PATH=/usr/lib/chromium/ \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_PRODUCT=chrome \
    CHROMIUM_FLAGS="--disable-software-rasterizer --disable-dev-shm-usage"

# Copia o .zshrc
COPY .zshrc /root

# Configuração do workspace e instalação dos pacotes npm
WORKDIR /workspace
COPY ../ . 

# Comando padrão para manter o container ativo
CMD ["tail", "-f", "/dev/null"]