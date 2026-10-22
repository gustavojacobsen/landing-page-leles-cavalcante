type Props = { itens: string[]; className?: string };

/**
 * Loop infinito em CSS puro (sem JS). Pausa no hover.
 * Com movimento reduzido, a faixa fica parada.
 */
export function Marquee({ itens, className = "" }: Props) {
  // Cada metade repete a lista para cobrir telas largas; a segunda metade é só visual.
  const metade = [...itens, ...itens];
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copia) => (
          <ul key={copia} aria-hidden={copia === 1 ? true : undefined} className="flex shrink-0 items-center">
            {metade.map((item, i) => (
              <li key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= itens.length ? true : undefined}>
                <span>{item}</span>
                <span aria-hidden className="mx-6 text-areia md:mx-8">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
