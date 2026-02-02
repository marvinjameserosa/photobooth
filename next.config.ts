import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {

    turbo: {
      resolve: {
        alias: {
          '@mediapipe/face_mesh': './lib/stubs/face_mesh.js',
        },
      },
    },
  } as any,


  webpack: (config, { isServer }) => {

    config.externals = config.externals || [];


    if (Array.isArray(config.externals)) {
      config.externals.push('@mediapipe/face_mesh');
    } else if (typeof config.externals === 'object') {
      config.externals['@mediapipe/face_mesh'] = '@mediapipe/face_mesh';
    }


    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@mediapipe/face_mesh'] = false;

    return config;
  },
};

export default nextConfig;
