import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageCarousel, { SLIDER_WIDTH, ITEM_WIDTH } from './ImageCarousel';

export default function ImagesCarousel(props) {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const { destination } = props;
  const urls = [...destination.uploadedUrls, { url: destination.uploadedUrl }];
  console.log(urls, 'here');
  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={urls || []}
        renderItem={ImageCarousel}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={urls.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'white',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots
      />
    </View>
  );
}
