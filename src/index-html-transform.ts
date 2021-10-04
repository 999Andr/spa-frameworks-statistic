import { TargetOptions } from '@angular-builders/custom-webpack';
import * as cheerio from 'cheerio';
import * as minfier from 'html-minifier';

export default (targetOptions: TargetOptions, indexHtml: string) => {
  if (((<TargetOptions>targetOptions).configuration as any).includes('production')) {
    const $ = cheerio.load(indexHtml);

    $('script:last').remove();

    $('body').append(`<script src="assets/main999.js" defer></script>`);

    $('script').each((index, elem) => 
      $('head').append(`<link rel="preload" href=${$(elem).prop('src')} as="script">`) as any 
    );

    const minified = minfier.minify($.html(), {
      removeComments: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
    });

    return minified;
  }
  
  return indexHtml;
};