import type { ContactLink } from '../../types';

/** 표지 연락처 링크 목록. */
export function Contact({ links }: { links: ContactLink[] }) {
  return (
    <div className="contact">
      {links.map((link, i) => (
        <a href={link.href} key={i}>
          <span className="lb">{link.label}</span>
          <span className="u">{link.text}</span>
        </a>
      ))}
    </div>
  );
}
