IMAGE_TEMP_FOLDER=image_tmp
OUT_WIDTH=700
OUT_HEIGHT=700

clean:
	rm -rf $(IMAGE_TEMP_FOLDER)

process_images_dither:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -monochrome -resize $(OUT_WIDTH)x$(OUT_HEIGHT) -gravity center -extent $(OUT_WIDTH)x$(OUT_HEIGHT) *.jpg

process_images_color:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -resize $(OUT_WIDTH)x$(OUT_HEIGHT) -gravity center -extent $(OUT_WIDTH)x$(OUT_HEIGHT) *.jpg

process_images_greyscale:
	mkdir $(IMAGE_TEMP_FOLDER)
	gm mogrify -output-directory $(IMAGE_TEMP_FOLDER)  -colorspace gray -resize $(OUT_WIDTH)x$(OUT_HEIGHT) -gravity center -extent $(OUT_WIDTH)x$(OUT_HEIGHT) *.jpg
