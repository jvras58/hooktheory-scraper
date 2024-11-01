FROM node:lts

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    chromium libnss3 libfreetype6 libharfbuzz0b \
    ca-certificates fonts-freefont-ttf fonts-noto-color-emoji libatk1.0-0 \
    libatk-bridge2.0-0 libcups2 libxcomposite1 libxrandr2 libxdamage1 \
    libxkbcommon0 libgbm1 libpango-1.0-0 libasound2 && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    CHROME_BIN=/usr/bin/chromium \
    CHROME_PATH=/usr/lib/chromium/ \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_PRODUCT=chrome \
    CHROMIUM_FLAGS="--disable-software-rasterizer --disable-dev-shm-usage"

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .


CMD ["npm", "run", "dev"]
