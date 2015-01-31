IMAGE_TEMP_FOLDER=image_tmp

clean:
	rm -rf $(IMAGE_TEMP_FOLDER)

process_images_dither:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -monochrome -resize 1920x1080 -gravity center -extent 1920x1080 *.jpg

process_images_color:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -resize 1920x1080 -gravity center -extent 1920x1080 *.jpg

process_images_greyscale:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -colorspace gray -resize 1920x1080 -gravity center -extent 1920x1080 *.jpg
