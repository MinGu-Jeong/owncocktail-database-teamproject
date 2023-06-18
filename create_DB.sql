DROP DATABASE `MyCocktail`;
CREATE DATABASE `MyCocktail`;

USE `MyCocktail`;

CREATE TABLE `Recipe`(
    `recipe_name` VARCHAR(50) NOT NULL,
    `img_url` VARCHAR(255),
    PRIMARY KEY(`recipe_name`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `Recipe_Ingredient`(
    `recipe_ingredient_id` INT AUTO_INCREMENT,
    `recipe_name` VARCHAR(50),
    `ingredient` VARCHAR(50),
    `ratio` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`recipe_ingredient_id`),
    FOREIGN KEY(`recipe_name`) REFERENCES `Recipe`(`recipe_name`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `Ingredient`(
    `ingredient_name` VARCHAR(50),
    `count` INT default 0,
    `ingredient_img_url` VARCHAR(255),
    PRIMARY KEY(`ingredient_name`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `member`(
    `member_id` VARCHAR(20),
    `member_name` VARCHAR(50) NOT NULL,
    `tel` VARCHAR(20) UNIQUE, 
    `passwd` VARCHAR(1024) NOT NULL,
    `birth` DATE NOT NULL,
    `email` VARCHAR(50) UNIQUE,
    PRIMARY KEY(`member_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `Default_Board`(
    `board_id` INT AUTO_INCREMENT,
    `recipe_name` VARCHAR(50) NOT NULL,
    `member_id` VARCHAR(20),
    `write_time` DATETIME NOT NULL,
    `text` VARCHAR(4096) NOT NULL,
    `good_cnt` INT DEFAULT 0,
    `snack` VARCHAR(255),
    `tool` VARCHAR(1024),
    PRIMARY KEY(`board_id`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`recipe_name`) REFERENCES `Recipe`(`recipe_name`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `Default_Board_Comment`(
    `board_comment_id` INT AUTO_INCREMENT,
    `text` VARCHAR(2048) NOT NULL,
    `member_id` VARCHAR(20) NOT NULL,
    `datetime` DATETIME,
    `good_cnt` INT DEFAULT 0,
    `board_id` INT,
    PRIMARY KEY(`board_comment_id`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`board_id`) REFERENCES `Default_Board`(`board_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `My_Board`(
    `myboard_id` INT AUTO_INCREMENT,
    `recipe_name` VARCHAR(50) NOT NULL,
    `member_id` VARCHAR(20),
    `write_time` DATETIME NOT NULL,
    `text` VARCHAR(4096) NOT NULL,
    `good_cnt` INT DEFAULT 0,
    `snack` VARCHAR(255),
    `tool` VARCHAR(1024),
    PRIMARY KEY(`myboard_id`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`recipe_name`) REFERENCES `Recipe`(`recipe_name`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `My_Board_Comment`(
    `myboard_comment_id` INT AUTO_INCREMENT,
    `text` VARCHAR(2048) NOT NULL,
    `member_id` VARCHAR(20) NOT NULL,
    `datetime` DATETIME,
    `good_cnt` INT DEFAULT 0,
    `myboard_id` INT,
    PRIMARY KEY(`myboard_comment_id`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`myboard_id`) REFERENCES `My_Board`(`myboard_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `DefaultBoard_Good`(
    `num` INT AUTO_INCREMENT,
    `member_id` VARCHAR(20) NOT NULL,
    `board_id` INT NOT NULL,
    PRIMARY KEY(`num`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`board_id`) REFERENCES `Default_Board`(`board_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `DefaultBoardComment_Good`(
    `num` INT AUTO_INCREMENT,
    `member_id` VARCHAR(20) NOT NULL,
    `board_comment_id` INT NOT NULL,
    PRIMARY KEY(`num`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`board_comment_id`) REFERENCES `Default_Board_Comment`(`board_comment_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `MyBoard_Good`(
    `num` INT AUTO_INCREMENT,
    `member_id` VARCHAR(20) NOT NULL,
    `myboard_id` INT NOT NULL,
    PRIMARY KEY(`num`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`myboard_id`) REFERENCES `My_Board`(`myboard_id`)
)DEFAULT CHARSET = utf8;

CREATE TABLE `MyBoardComment_Good`(
    `num` INT AUTO_INCREMENT,
    `member_id` VARCHAR(20) NOT NULL,
    `myboard_comment_id` INT NOT NULL,
    PRIMARY KEY(`num`),
    FOREIGN KEY(`member_id`) REFERENCES `member`(`member_id`),
    FOREIGN KEY(`myboard_comment_id`) REFERENCES `My_Board_Comment`(`myboard_comment_id`)
)DEFAULT CHARSET = utf8;
  
insert into Recipe(recipe_name, img_url) values
("멘하탄", "./images/manhatten.png"),
("미모사", "./images/mimosa.png"),
("아일리쉬 커피", "./images/mojito.png"),
("올드 패션드", "./images/oldFashiond.png"),
("아메리카노", "./images/americano.png"),
("마이타이", "./images/mojito.png"),
("드라이 마티니", "./images/dryMartini.png"),
("프렌치75", "./images/french75.png"),
("진피츠", "./images/mojito.png"),
("롱 아일랜드 아이스티", "./images/longislandicetea.png"),
("모히또", "./images/mojito.png"),
("섹스 온 더 비치", "./images/sexOntheBeach.png"),
("벨리니","./images/bellini.png"),
("블러디 메리","./images/blody_mary.png"),
("골든 드림","./images/golen_dream.png"),
("쿠바 리브레","./images/cubaLibre.png"),
("피나 콜라다","./images/pinaColada.png"),
("블랙 러시안","./images/blackBussian.png"),
("키르","./images/Kir.png"),
("홀시스 넥","./images/mojito.png"),
("시 브리즈","./images/seabreeze.png"),
("싱가폴 슬링","https://barmadeliquor.com/web/product/big/20200629/f90367809a1409682fcb571ed9abcb28.jpg"),
("엔젤 페이스","https://cocktailpartyapp.com/wp-content/uploads/Angel-Face.webp"),
("카지노","./images/carzino.png"),
("사제락","./images/mojito.png"),
("메가 멘하탄_admin","./images/mojito.png"),
("약한 미모사_admin","./images/mojito.png"),
("엄청난 아일리쉬 커피_admin","./images/mojito.png"),
("약한 카지노_admin","./images/mojito.png"),
("뉴 사제락_admin","./images/mojito.png"),
("데빌  페이스_admin","./images/mojito.png"),
("실버 드림_admin","./images/silveDream.png"),
("더 진한 올드 패션드_admin","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcEpQuxAKIgNW4pTEii_uDPESpUMAtOz-UQ&usqp=CAU");

insert into Recipe_Ingredient(Recipe_Ingredient_id, recipe_name, ingredient, ratio) values 
("1", "멘하탄", "위스키", "50ml"),
("2", "멘하탄", "레드 베르무트", "20ml"),
("3", "멘하탄", "앙고스투라비터", "1ml"),
("4", "미모사", "오렌지 주스", "75ml"),
("5", "미모사", "프로세코", "75ml"),
("6", "아일리쉬 커피", "아일리쉬 위스키", "50ml"),
("7", "아일리쉬 커피", "커피", "120ml"),
("8", "아일리쉬 커피", "생크림", "50ml"),
("9", "아일리쉬 커피", "설탕", "5ml"),
("10", "올드 패션드", "버번 위스키", "45ml"),
("11", "올드 패션드", "설탕", "5ml"),
("12", "올드 패션드", "앙고스투라비터", "1ml"),
("13", "올드 패션드", "탄산수", "15ml"),
("14", "아메리카노", "캄파리", "30ml"),
("15", "아메리카노", "스위트 베르무트", "30ml"),
("16", "아메리카노", "탄산수", "30ml"),
("17", "마이타이", "자메이카 럼", "30ml"),
("18", "마이타이", "마르티니크 골드 럼", "30ml"),
("19", "마이타이", "라임 주스", "15ml"),
("20", "마이타이", "오렌지 큐라스", "15ml"),
("21", "마이타이", "오르쟈 시럽", "30ml"),
("22", "마이타이", "설탕 시럽", "7.5ml"),
("23", "드라이 마티니", "진", "2/3"),
("24","드라이 마티니", "프렌치 베르무트","1/3"),
("25","드라이 마티니", "앙고르투라 비터스","1Dash"),
("26","프렌치75","진","30ml"),
("27","프렌치75","샴페인","60ml"),
("28","프렌치75","레몬 주스","15ml"),
("29","프렌치75","설탕 시럽","2Dash"),
("30","진피츠", "진","45ml"),
("31","진피츠","레몬 주스","30ml"),
("32","진피츠","설탕 시럽", "10ml"),
("33","진피츠","탄산수","약간"),
("34","롱 아일랜드 아이스티","진","15ml"),
("35","롱 아일랜드 아이스티","보드카","15ml"),
("36","롱 아일랜드 아이스티","화이트 럼","15ml"),
("37","롱 아일랜드 아이스티","데킬라","15ml"),
("38","롱 아일랜드 아이스티","코앵트로","15ml"),
("39","롱 아일랜드 아이스티","레몬 주스","30ml"),
("40","롱 아일랜드 아이스티","심플 시럽","20ml"),
("41","롱 아일랜드 아이스티","콜라","Full Up"),
("42","모히또","화이트 럼","45ml"),
("43","모히또","민트","6 leaves"),
("44","모히또","백설탕","2tsp"),
("45","모히또","라임 주스","20ml"),
("46","모히또","탄산수","Full Up"),
("47","섹스 온 더 비치","보드카","40ml"),
("48","섹스 온 더 비치","피치 슈냅스","20ml"),
("49","섹스 온 더 비치","크린베리 주스","40ml"),
("50","섹스 온 더 비치","오렌지 주스","40ml"),
("51","벨리니","프로세코","100ml"),
("52","벨리니","복숭아 퓨레","40ml"),
("53","블러디 메리","보드카","45ml"),
("54","블러디 메리","레몬 주스","15ml"),
("55","블러디 메리","토마토 주스","90ml"),
("56","블러디 메리","우스터 소스","2Dashes"),
("57","골든 드림","갈리아노","20ml"),
("58","골든 드림","트리플 섹","20ml"),
("59","골든 드림","오렌지 주스","20ml"),
("60","골든 드림","생크림","10ml"),
("61","쿠바 리브레","화이트 럼","50ml"),
("62","쿠바 리브레","라임 주스","10ml"),
("63","쿠바 리브레","콜라","120ml"),
("64","피나 콜라다","화이트 럼","50ml"),
("65","피나 콜라다","크림","30ml"),
("66","피나 콜라다","파인애플","50ml"),
("67","블랙 러시안","보드카","30ml"),
("68","블랙 러시안","깔루아","15ml"),
("69","키르","화이트 와인","90ml"),
("70","키르","크렘 드 카시스","10ml"),
("71","홀시스 넥","브랜디","45ml"),
("72","홀시스 넥","진저에일","120ml"),
("73","홀시스 넥","앙고스투라 비터","1Dash"),
("74","시 브리즈","보드카","40ml"),
("75","시 브리즈","크랜베리 주스","120ml"),
("76","시 브리즈","자몽 주스","30ml"),
("77","시 브리즈","앙고스투라 비터","30ml"),
("78","싱가폴 슬링","진","30ml"),
("79","싱가폴 슬링","코앵트로","7.5ml"),
("80","싱가폴 슬링","D.O.M. 베네딕틴","7.5ml"),
("81","싱가폴 슬링","체리 리큐르","15ml"),
("82","싱가폴 슬링","파인애플 주스 ","120ml"),
("83","싱가폴 슬링","라임 주스","15ml"),
("84","싱가폴 슬링","그레나딘 시럽","10ml"),
("85","엔젤 페이스","진","30ml"),
("86","엔젤 페이스","칼바도스","30ml"),
("87","엔젤 페이스","에프리콧 브랜디","30ml"),
("88","카지노","진","45ml"),
("89","카지노","마라스키노","10ml"),
("90","카지노","레몬 주스","10ml"),
("91","카지노","오렌지 비터","2 Dashes"),
("92","사제락","코냑","50ml"),
("93","사제락","압생트","10ml"),
("94","사제락","설탕","1tsp"),
("95","사제락","페이쇼드 비터","2 Dashes");



insert into ingredient(ingredient_name, count, ingredient_img_url) value 
("위스키", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '위스키'), "./images/mojito.png"),
("레드 베르무트", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '레드 베르무트'), "./images/mojito.png"),
("앙고스투라비터", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '앙고스투라비터'), "./images/angosiura.png"),
("오렌지 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '오렌지 주스'), "./images/orange_juice.png"),
("프로세코", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '프로세코'), "https://cdn.veluga.kr/files/supplier/131/drinks/2029_Bericanto_Proseco.png"),
("아일리쉬 위스키", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '아일리쉬 위스키'), "./images/mojito.png"),
("커피", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '커피'), "./images/mojito.png"),
("생크림", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '생크림'), "./images/whipping_cream.png"),
("설탕", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '설탕'), "./images/sugar.png"),
("버번 위스키", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '버번 위스키'), "./images/mojito.png"),
("탄산수", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '탄산수'), "./images/soda.png"),
("캄파리", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '캄파리'), "./images/mojito.png"),
("스위트 베르무트", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '스위트 베르무트'), "./images/mojito.png"),
("자메이카 럼", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '자메이카 럼'), "./images/mojito.png"),
("마르티니크 골드 럼", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '마르티니크 골드 럼'), "./images/mojito.png"),
("라임 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '라임 주스'), "./images/lime_juice.png"),
("오렌지 큐라스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '오렌지 큐라스'), "./images/mojito.png"),
("오르쟈 시럽", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '오르쟈 시럽'), "./images/mojito.png"),
("설탕 시럽", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '설탕 시럽'), "./images/mojito.png"),
("진", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '진'), "./images/jin.png"),
("프렌치 베르무트", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '프렌치 베르무트'), "./images/mojito.png"),
("앙고르투라 비터스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '앙고르투라 비터스'), "./images/angosiura.png"),
("샴페인", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '샴페인'), "./images/mojito.png"),
("레몬 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '레몬 주스'), "./images/remonjuice.png"),
("보드카", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '보드카'), "./images/vodca.png"),
("화이트 럼", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '화이트 럼'), "./images/mojito.png"),
("데킬라", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '데킬라'), "./images/benedictine_DOM.png"),
("코앵트로", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '코앵트로'), "./images/cointreauNoir.png"),
("심플 시럽", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '심플 시럽'), "NULL"),
("콜라", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '콜라'), "NULL"),
("민트", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '민트'), "NULL"),
("백설탕", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '백설탕'), "NULL"),
("피치 슈냅스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '피치 슈냅스'), "NULL"),
("크린베리 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '크린베리 주스'), "NULL"),
("복숭아 퓨레", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '복숭아 퓨레'), "NULL"),
("토마토 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '토마토 주스'), "NULL"),
("우스터 소스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '우스터 소스'), "NULL"),
("갈리아노", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '갈리아노'), "./images/gallinao.png"),
("트리플 섹", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '트리플 섹'), "./images/tripleSecLiqueur.png"),
("크림", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '크림'), "NULL"),
("파인애플", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '파인애플'), "NULL"),
("깔루아", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '깔루아'), "./images/kahlua.png"),
("화이트 와인", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '화이트 와인'), "NULL"),
("크렘 드 카시스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '크렘 드 카시스'), "NULL"),
("브랜디", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '브랜디'), "NULL"),
("진저에일", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '진저에일'), "NULL"),
("앙고스투라 비터", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '앙고스투라 비터'), "NULL"),
("크랜베리 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '크랜베리 주스'), "NULL"),
("자몽 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '자몽 주스'), "NULL"),
("D.O.M. 베네딕틴", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = 'D.O.M. 베네딕틴'), "./images/benedictine_DOM.png"),
("체리 리큐르", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '체리 리큐르'), "./images/cherryLiqueur.png"),
("파인애플 주스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '파인애플 주스'), "./images/pineappleJuice.png"),
("그레나딘 시럽", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '그레나딘 시럽'), "./images/grenadines_yrup.png"),
("칼바도스", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '칼바도스'), "./images/calvados.png"),
("에프리콧 브랜디", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '에프리콧 브랜디'), "./images/apricot_brandy.png"),
("마라스키노", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '마라스키노'), "NULL"),
("오렌지 비터", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '오렌지 비터'), "NULL"),
("코냑", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '코냑'), "NULL"),
("압생트", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '압생트'), "NULL"),
("페이쇼드 비터", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '페이쇼드 비터'), "NULL"),
("레몬", (SELECT COUNT(*) FROM `Recipe_Ingredient` WHERE `ingredient` = '레몬'), "./images/remon.png");

insert into member(member_id, member_name, tel, passwd, birth, email) value 
('admin', '관리자', '010-4080-3160', '1234', '1985.01.15', 'koreatech@abc.kr'),
('IronMan', '이철수', '010-2345-6789', 'pass1234', '1995.01.15', 'ironman@abc.kr'),
('CaptainMarvel', '박영희', '010-3456-7890' , 'pass5678', '1998.03.22', 'captain@abc.kr'),
('SpiderMan', '김영수', '010-4567-8901' , 'pass9012', '2002.06.30', 'spider@abc.kr'),
('BlackWidow', '최지은', '010-5678-9012' , 'pass3456', '1990.09.07', 'widow@abc.kr'),
('Thor', '정미나', '010-6789-0123', 'pass7890', '1988.12.11', 'thor@abc.kr');
SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO Default_Board (board_id, recipe_name, member_id, write_time, text, good_cnt, snack, tool) VALUES 
('1', '멘하탄', 'admin', '2023-06-02', '모든 재료들을 얼음조각이 있는 혼합 유리에 붓고, 잘 저어주세요. 차가운 칵테일 잔에 부어주세요.', '2', '타코, 치킨 윙, 스큐류바', '블렌더, 막대기, 하이볼 잔'),
('2', '미모사', 'admin', '2023-06-02', '오렌지 주스를 플루트 잔에 붓고 프로세코 와인을 부드럽게 붓고, 살살 저으세요.', '2', '과자, 소금', '쉐이커, 막대기, 하이볼 잔'),
('3', '아일리쉬 커피', 'admin', '2023-06-02', '따뜻한 블랙 커피가 예열된 아이리쉬 커피잔에 따라집니다. 위스키와 적어도 한 티스푼의 설탕을 넣고 녹을 때까지 저으세요. 신선하고 두꺼운 냉장 크림을 커피 표면 바로 위에 있는 스푼의 뒷면에 조심스럽게 부으세요.', '3', '커피 과자, 치즈케이크', '쉐이커, 막대기, 칵테일 잔'),
('4', '올드 패션드', 'admin', '2023-06-02', '모든 재료들을 얼음조각이 있는 혼합 유리에 붓고, 잘 저어주세요. 차가운 칵테일 잔에 부어라.', '4', '타코, 치킨 윙, 스큐류바', '블렌더, 막대기, 하이볼 잔'),
('5', '아메리카노', 'admin', '2023-06-02', '모든 재료들을 얼음조각이 있는 혼합 유리에 붓고, 잘 저어주세요. 차가운 칵테일 잔에 부어라.', '4', '타코, 치킨 윙, 스큐류바', '블렌더, 막대기, 하이볼 잔'),
('6','드라이 마티니','admin','2023-06-02','진과 베르무트를 2:1로 잘 저어주세요, 칵테일 잔에 부어주세요','2','새우, 해산물 요리','칵테일 잔'),
('7','프렌치75','admin','2023-06-02','재료들을 잘 섞어주세요. 그리고 기구를 사용하지 않고 직접 글라스에 넣어요','5','크림파스타,카시스 프라페','글라스 잔'),
('8','진피츠','admin','2023-06-02','재료들을 잘 섞어주세요. 마지막에 레몬으로 장식하시면 좋아요~~','3','해산물 요리, 타코','블렌더,텀블러'),
('9','롱 아일랜드 아이스티','admin','2023-06-02','재료들을 잘 섞어주세요. 달콤하지만 도수가 높으면 적당한 음주를 선호합니다.','4','과자, 과일','블랜더, 컵'),
('10','모히또','admin','2023-06-02','취하고 싶지 않으면 무알콜 럼을 넣어도 상관없어요. 다만 풀내음이 올라올수 있음으로 주의!!','3','과자, 과일','막대기,컵'),
('11','섹스 온 더 비치','admin','2023-06-02','재료를 잘 섞으시고 남녀 사이의 뜨거운 사랑을 이 술 한잔으로 느껴보세요.','4','해산물 요리','막대기, 컵'),
('12','벨리니','admin','2023-06-02','재료를 잘 섞으시고 쉐이커를 사용하고 잔에 담아주세요','3','해산물 요리,치즈 요리,과일','쉐이커, 잔'),
('13','블러디 메리','admin','2023-06-02','재료를 쉐이커에 넣고 잘 흔들어 주세요. 얼음은 필수!!','10','베이컨, 멕시칸 요리, 스테이크','쉐이커, 잔, 셀러리 스틱, 그릇'),
('14','골든 드림','admin','2023-06-02','모든 재료를 쉐이커에 넣고 잘 흔들어 주세요. 스트레이너 사용 필수!!','5','치즈케이크,셀러드,크림 디저트','쉐이커, 스트레이너, 잔'),
('15','쿠바 리브레','admin','2023-06-02','모든 재료를 쉐이커에 넣고 잘 흔들어 주세요. 칵테일 글래스에 얼음을 넣고 담아 주세요.','6','모히또 치킨, 피쉬 앤 칩스, 새우 칵테일,','쉐이커, 칵테일 글래스'),
('16','피나 콜라다','admin','2023-06-02','쉐이커를 모든 재료를 넣어 잘 흔들어 주세요. 마지막에 파인애플 조각으로 장식까지 해주면 완벽!!','5','바비큐 해산물, 샐러드, 치킨 케밥','쉐이커, 스트레이너'),
('17','블랙 러시안','admin','2023-06-02','온더록으로 보드카와 커피 리큐어를 칵테일 글래스에 넣어주세요.','4','초콜릿,치즈,쿠키','칵테일 글래스'),
('18','키르','admin','2023-06-02','칵테일 글래스에 재료를 넣어 믹스 스틱으로 저어주세요','5','생선 요리, 디저트, 샐러드','칵테일 글래스, 믹스 스틱'),
('19','홀시스 넥','admin','2023-06-02','칵테일의 이름 자체도 대통령이 사나운 말의 목을 어루만지며 달래 주면서 마셨주세요','9','바비큐, 소고기, 감자튀김','병'),
('20','시 브리즈','admin','2023-06-02','시 브리즈 칵테일은 상큼하면서도 과일 향이 풍부한 맛을 가지고 있습니다.','16','해산물, 샐러드, 바비큐','하이볼 잔, 칵테일 스트레이너'),
('21','싱가폴 슬링','admin','2023-06-02',' 상큼하고 과일 향이 풍부한 칵테일 즐겨보세요','17','태국 요리, 샐러드, 바비큐','하이볼 잔, 쉐이커, 스푼'),
('22','엔젤 페이스','admin','2023-06-02','강한 알코올 맛과 과일 향이 어우러진 강렬한 칵테일 즐겨보세요.','25','치즈, 과일','쉐이커, 스트레이너, 쉐이커 글래스, 잔'),
('23','카지노','admin','2023-06-02','고전적인 칵테일, 강한 알코올 맛과 상쾌한 시트러스 향을 맛봐요.','9','해산물, 간식, 샐러드','쉐이커, 스트레이너, 쉐이커 글래스, 잔'),
('24','사제락','admin','2023-06-02','은 전통적인 뉴올리언스 스타일의 칵테일, 허브와 스파이시한 맛 즐겨보세요.','2','뉴올리언스 요리','얼음 큐브, 스트레이너, 옵셔널');

INSERT INTO Default_Board_Comment(board_comment_id, text, member_id, datetime, good_cnt, board_id) VALUES ("1", "이 레시피 진짜 좋아요!", "admin", "2023-06-02", "0", "1"),
("2", "맛있게 만들어봤어요, 추천합니다!", "admin", "2023-06-02", "0", "1"),
("22", "너무 맛있어요, 추천합니다!", "admin", "2023-06-02", "0", "22");

INSERT INTO My_Board (myboard_id, recipe_name, member_id, write_time, text, good_cnt, snack, tool) VALUES 
('1', '메가 멘하탄_admin', 'admin', '2023-06-02', '모든 재료들을 얼음조각이 있는 혼합 유리에 붓고, 잘 저어주세요. 차가운 칵테일 잔에 부어라.', '0', '타코, 치킨 윙, 스큐류바', '블렌더, 막대기, 하이볼 잔'),
('2', '약한 미모사_admin', 'admin', '2023-06-02', '오렌지 주스를 플루트 잔에 붓고 프로세코 와인을 부드럽게 붓고, 살살 저으세요.', '0', '과자, 소금', '쉐이커, 막대기, 하이볼 잔'),
('3', '엄청난 아일리쉬 커피_admin', 'admin', '2023-06-02', '따뜻한 블랙 커피가 예열된 아이리쉬 커피잔에 따라집니다. 위스키와 적어도 한 티스푼의 설탕을 넣고 녹을 때까지 저으세요. 신선하고 두꺼운 냉장 크림을 커피 표면 바로 위에 있는 스푼의 뒷면에 조심스럽게 부으세요.', '0', '커피 과자, 치즈케이크', '쉐이커, 막대기, 칵테일 잔'),
('4', '더 진한 올드 패션드_admin', 'admin', '2023-06-02', '따뜻한 블랙 커피가 예열된 아이리쉬 커피잔에 따라집니다. 위스키와 적어도 한 티스푼의 설탕을 넣고 녹을 때까지 저으세요. 신선하고 두꺼운 냉장 크림을 커피 표면 바로 위에 있는 스푼의 뒷면에 조심스럽게 부으세요.', '0', '커피 과자, 치즈케이크', '쉐이커, 막대기, 칵테일 잔'),
('5', '약한 카지노_admin', 'admin', '2023-06-02', '모든 재료들을 얼음조각이 있는 혼합 유리에 붓고, 잘 저어주세요. 차가운 칵테일 잔에 부어라.', '0', '해산물, 간식, 샐러드', '쉐이커, 스트레이너, 쉐이커 글래스, 잔'),
('6', '뉴 사제락_admin', 'admin', '2023-06-02', '오렌지 주스를 플루트 잔에 붓고 프로세코 와인을 부드럽게 붓고, 살살 저으세요.', '0', '과자, 소금', '쉐이커, 막대기, 하이볼 잔'),
('7', '데빌 페이스_admin', 'admin', '2023-06-02', '강한 알코올 맛과 과일 향이 어우러진 강렬한 칵테일 즐겨보세요.', '0', '커피 과자, 치즈케이크', '쉐이커, 막대기, 칵테일 잔'),
('8', '실버 드림_admin', 'admin', '2023-06-02', '모든 재료를 쉐이커에 넣고 잘 흔들어 주세요. 스트레이너 사용 필수!!', '0', '커피 과자, 치즈케이크', '쉐이커, 막대기, 칵테일 잔');

insert into Recipe_Ingredient(Recipe_Ingredient_id, recipe_name, ingredient, ratio) values 
("96", "메가 멘하탄_admin", "레드 베르무트", "40ml"),
("97", "메가 멘하탄_admin", "앙고스투라비터", "1ml"),
("98", "약한 미모사_admin", "오렌지 주스", "75ml"),
("99", "약한 미모사_admin", "프로세코", "30ml"),
("100", "엄청난 아일리쉬 커피_admin", "아일리쉬 위스키", "50ml"),
("101", "엄청난 아일리쉬 커피_admin", "커피", "120ml"),
("102", "엄청난 아일리쉬 커피_admin", "생크림", "50ml"),
("103", "엄청난 아일리쉬 커피_admin", "설탕", "5ml"),
("104", "엄청난 아일리쉬 커피_admin", "레몬", "2ml"),
("105", "더 진한 올드 패션드_admin", "버번 위스키", "60ml"),
("106", "더 진한 올드 패션드_admin", "설탕", "5ml"),
("107", "더 진한 올드 패션드_admin", "앙고스투라비터", "1ml"),
("108", "더 진한 올드 패션드_admin", "탄산수", "15ml"),
("109","약한 카지노_admin","진","45ml"),
("110","약한 카지노_admin","마라스키노","10ml"),
("111","약한 카지노_admin","레몬 주스","10ml"),
("112","뉴 사제락_admin","코냑","50ml"),
("113","뉴 사제락_admin","압생트","10ml"),
("114","뉴 사제락_admin","설탕","1tsp"),
("115","뉴 사제락_admin","페이쇼드 비터","2 Dashes"),
("116","데빌 페이스_admin","진","30ml"),
("117","데빌 페이스_admin","칼바도스","30ml"),
("118","데빌 페이스_admin","에프리콧 브랜디","30ml"),
("119","실버 드림_admin","갈리아노","20ml"),
("120","실버 드림_admin","트리플 섹","20ml"),
("121","실버 드림_admin","오렌지 주스","20ml"),
("122","실버 드림_admin","생크림","10ml");

INSERT INTO My_Board_Comment(myboard_comment_id, text, member_id, datetime, good_cnt, myboard_id) VALUES ("1", "이 레시피 진짜 좋아요!", "admin", "2023-06-02", "0", "1"),
("2", "맛있게 만들어봤어요, 추천합니다!", "admin", "2023-06-02", "0", "1");

INSERT INTO DefaultBoard_Good(num, member_id, board_id) VALUES ("1", "admin", "1"),
("2", "admin", "2"),
("3", "IronMan", "1"),
("4", "BlackWidow", "2"),
("5", "Thor", "1");