# bulleted-list

Bulleted List is a custom Salesforce Marketing Cloud Content Builder block using the [blocksdk](https://github.com/salesforce-marketingcloud/blocksdk).

Bulleted List creates an email-ready bulleted list.  Unlike the bulleted list that can be created via the WYSIWYG Freeform Editor, the list generated by this content block is an HTML table and will render precisely with nearly all email clients.

Github repository:  https://github.com/bkaplan-github/bulleted-list

Heroku app: https://bulleted-list.herokuapp.com/

[![Bulleted List](https://github.com/bkaplan-github/bulleted-list/blob/master/BulletedList.jpg)](https://github.com/bkaplan-github/bulleted-list)

## How to Use
Simply select the number of bullets using the slider at the top, and type in the bullet text in the inputs below.  Then set the rendering options.  Options are:

#### Padding
Padding around the content block.

#### Alignment
Controls the horizontal alignment of the list if none of the list items wrap.

#### Spacing
Controls the spacing between items of the list.

#### Bullet Spacing
Controls the spacing between the bullets and items.

#### Line Height
Controls the line height of each bullet item.  Note that this affects the spacing between lines of a list item when it wraps and also affects the spacing between items of the list.

#### Font Family
The font family used for the text.

#### Text Size
The size of the text of the items.

#### Bullet Size
The size of the text of the bullets themselves.

#### Text Color
The color of the item text.

#### Bullet Color
The color of the bullets.

#### Mobile Class
The class(es) applied to the bulleted list on mobile displays.

#### Mobile Bullet Class
The class(es) applied to the bullets on mobile displays.

#### Mobile Item Class
The class(es) applied to the items on mobile displays.

## Versions
#### 1.1 - changed source code folder structure and modified spacing between parameters
#### 1.0 - initial release

## Future Enhancements
* Allow links in the list.
* Add rollover descriptions of the parameters.
* Add support for numbered lists.
* Add support for cycling of colors for bullets and list items.
* Add color picker for the colors.
