/** @type {import('next').NextConfig} */
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "./shared-scss")],
    additionalData: `@import "global.scss";`, // 添加在文件末尾
  },
  eslint: {
    dirs: ["app"], // 指定要检查的目录
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/webp"],
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'rik-website.oss-cn-hangzhou.aliyuncs.com',
    //     port: '',
    //   },
    // ],
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    if (!dev) {
      // 在每次编译时进行校验
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
      require("./sitemap-generator");
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|jpeg|gif|json)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
      {
        source: "/:all*(webp|jpg|png|jpeg)",
        headers: [
          {
            key: "Content-Type",
            value: "image/webp",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
