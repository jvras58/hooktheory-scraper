SHEll := /bin/zsh



scraping:
	@echo "install dependencies"
	npm install
	@echo "Scraping data from the web"
	npm run dev