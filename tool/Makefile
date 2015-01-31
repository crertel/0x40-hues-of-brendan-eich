MINIFIED_SCRIPTS_FILE=minified_scripts.lol
MINIFIED_STYLES_FILE=minified_styles.lol
OUTFILE=index.html

all: clean assemble_layout

watch:

clean:
	rm -f $(MINIFIED_SCRIPTS_FILE)
	rm -f $(MINIFIED_STYLES_FILE)
	rm -f $(OUTFILE)

assemble_scripts:
	cat js/*.js > $(MINIFIED_SCRIPTS_FILE)

assemble_styles:
	cat css/*.css > $(MINIFIED_STYLES_FILE)

assemble_layout: assemble_scripts assemble_styles
	sed -e 's/%%SCRIPTS_FILENAME%%/$(MINIFIED_SCRIPTS_FILE)/' layout.html \
	| sed -e 's/%%STYLES_FILENAME%%/$(MINIFIED_STYLES_FILE)/' \
	| sed -e '/%%BODY%%/{r body.html' -e 'd}' > $(OUTFILE)
