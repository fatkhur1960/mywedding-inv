import Gallery, { RenderImageProps } from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";

import gallery1 from '../../assets/gallery/gallery1.jpg'
import gallery2 from '../../assets/gallery/gallery2.jpg'
import gallery4 from '../../assets/gallery/gallery4.jpg'
import gallery5 from '../../assets/gallery/gallery5.jpg'
import gallery6 from '../../assets/gallery/gallery6.jpg'
import gallery7 from '../../assets/gallery/gallery7.jpg'
import { useState, useCallback } from 'react';
import FadeTransition2 from '../../animations/FadeTransition2';

const ImageGallery = () => {
    const photos = [
        { src: gallery1, width: 3, height: 4 },
        { src: gallery2, width: 3, height: 4 },
        { src: gallery4, width: 16, height: 9 },
        { src: gallery5, width: 3, height: 4 },
        { src: gallery6, width: 3, height: 4 },
        { src: gallery7, width: 16, height: 9 },
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((_: any, { index }: { index: number }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const renderImage = ({ photo, index }: RenderImageProps) => {
        return (
            <div
                key={photo.key}
                onClick={(e) => openLightbox(e, { index })}
                className='hover:cursor-pointer hover:opacity-75 transition-all ease-in-out'
            >
                <FadeTransition2>
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        className="custom-image"
                        style={{ width: photo.width, height: 'auto', margin: '2px' }}
                    />
                </FadeTransition2>
            </div>
        );
    };

    return (
        <div>
            <Gallery
                photos={photos}
                onClick={openLightbox}
                renderImage={renderImage}
            />
            {/* @ts-ignore */}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map((x: any) => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                            styles={{
                                view(base, state) {
                                    return {
                                        ...base,
                                        display: 'flex !important',
                                        justifyContent: 'center !important',
                                    }
                                },
                            }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default ImageGallery;