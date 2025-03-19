export type ContentfulImage = {
  fields: {
    file: {
      url: string;
    };
  };
}

export type IconLink = {
  type: 'tiktok' | 'spotify' | 'email' | 'instagram' | 'appleMusic' | 'youtube';
  id?: string;
  link?: string;
};

export type LiveEvent = {
  date: string;
  eventType: string;
  location: string;
  constellation: string;
};

export type GeneralContent = {
  heroImage: ContentfulImage;
  aboutDescription: string;
  aboutImage: ContentfulImage;
}
