import s from './MovieCard.module.css';
import empteImgURL from 'Images/imgPlaceholder.png';

const FilmView = ({
  data: { backdrop_path, title, release_date, vote_average, overview, genres },
}) => (
  <div className="flex-box">
    {backdrop_path ? (
      <img
        className={s.img}
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt={title}
      />
    ) : (
      <img
        className={s.emptyImg}
        src={empteImgURL}
        alt={title ? title : 'Unknown'}
      />
    )}

    <div className={s.desc}>
      <h2>
        {`${title}`}
        <span className={s.release_date}>({release_date.slice(0, 4)})</span>
      </h2>

      <p>
        UserScore
        <span className={s.span}>{`${vote_average}`}</span>
      </p>

      <h3>Overview</h3>
      <p className={s.descr}>{overview}</p>
      <h3 className={s.subtitle}>Genres</h3>

      <ul className={`flex-box ${s.list}`}>
        {genres.map(({ name }) => (
          <li key={name} className={s['list-item']}>
            <p className={s.genres}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FilmView;
