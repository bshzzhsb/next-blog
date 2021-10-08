export function slugify(content: string) {
  return 'a' + content.replace(/[\s\.+]/g, '');
}
