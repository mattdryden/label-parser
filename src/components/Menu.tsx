import './Menu.css';

interface Props {
    onSearchChange: (text: string) => void;
}

const Menu = (props: Props) => {
    return (
        <header className='menu'>
            <div className='logo'>
                <img src='public/ssc-logo.jpeg'></img>
            </div>
            <input
                className="search-bar"
                type="text"
                onChange={(e: any) => {
                    props.onSearchChange(e.target.value)
                }}
            ></input>
        </header>
    )
}

export default Menu;
