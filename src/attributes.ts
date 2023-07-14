export type Attrs = {[name: string]: string}

export function combineAttrs(source: Attrs, target: Attrs) {
  for (let name in source) {
    if (name == "class" && target.class) target.class += " " + source.class
    else if (name == "style" && target.style) target.style += ";" + source.style
    else target[name] = source[name]
  }
  return target
}

const noAttrs = Object.create(null)

export function attrsEq(a: Attrs | null, b: Attrs | null): boolean {
  if (a == b) return true
  if (!a) a = noAttrs
  if (!b) b = noAttrs
  let keysA = Object.keys(a!), keysB = Object.keys(b!)
  if (keysA.length != keysB.length) return false
  for (let key of keysA) {
    if (keysB.indexOf(key) == -1 || a![key] !== b![key]) return false
  }
  return true
}

export function updateAttrs(dom: HTMLElement, prev: Attrs | null, attrs: Attrs | null) {
  let changed = null
  if (prev) for (let name in prev) if (!(attrs && name in attrs)) dom.removeAttribute(changed = name)
  if (attrs) for (let name in attrs) if (!(prev && prev[name] == attrs[name])) dom.setAttribute(changed = name, attrs[name])
  return !!changed
}

export function getAttrs(dom: HTMLElement, omitClass = false) {
  let attrs = Object.create(null)
  for (let i = 0; i < dom.attributes.length; i++) {
    let attr = dom.attributes[i]
    if (!omitClass || attr.name != "class")
      attrs[attr.name] = attr.value
  }
  return attrs
}
