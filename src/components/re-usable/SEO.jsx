/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = "ES Gishoma the Hub of Science", 
    description = "Default Description", 
    keywords = "ES Gishoma,Ecole Secondaire Gishoma, High School, Rwanda, Rusizi Schools", 
    author = "Inono Tech Group",
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage || "/default-image.jpg"} />
            <meta property="og:url" content={ogUrl || window.location.href} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle || title} />
            <meta name="twitter:description" content={ogDescription || description} />
            <meta name="twitter:image" content={ogImage || "/default-image.jpg"} />
        </Helmet>
    );
};

export default SEO;
