/** @jsx h */
import h from "../../lib/h";
import "./header.css";
import { Link } from "../../lib/router";

const Header = () => {
  return (
    <div class="headerTitle">
      <Link href="/" data-link class="headerLogo">
        Today Plan
      </Link>
      <nav class="headerNav">
        <ul>
          <li>
            <Link href="/todolist" data-link>
              일정 관리
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
