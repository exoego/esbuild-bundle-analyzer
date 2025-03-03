import * as console from "node:console";

import { compose, map, filter } from 'rambda'

const composed = compose(
	map((x: number) => x * 2),
	filter((x: number) => x > 2)
);
export const handler = async (event: any) => {
	console.log(composed([1, 2, 3, 4]));
	console.log([
		{
			"_id": "6636e04374026d875e3a14f6",
			"index": 0,
			"guid": "fbdf37d0-aaad-4b0f-b143-28666927fa56",
			"isActive": true,
			"balance": "$2,337.22",
			"picture": "http://placehold.it/32x32",
			"age": 40,
			"eyeColor": "blue",
			"name": "Moody Duncan",
			"gender": "male",
			"company": "SULTRAXIN",
			"email": "moodyduncan@sultraxin.com",
			"phone": "+1 (948) 509-3889",
			"address": "100 Clermont Avenue, Glenbrook, Florida, 3611",
			"about": "Sunt minim sunt qui irure laborum pariatur nostrud laborum aliquip. Qui quis in laboris eu non enim nisi magna. Excepteur est ipsum nostrud pariatur. Officia esse consectetur est culpa reprehenderit aute et veniam sit.\r\n",
			"registered": "2015-02-14T11:49:26 -09:00",
			"latitude": 54.979732,
			"longitude": 86.310027,
			"tags": [
				"irure",
				"cupidatat",
				"sunt",
				"sunt",
				"dolore",
				"incididunt",
				"voluptate"
			],
			"friends": [
				{
					"id": 0,
					"name": "Blanca Blake"
				},
				{
					"id": 1,
					"name": "Stafford Gallagher"
				},
				{
					"id": 2,
					"name": "Odessa Figueroa"
				}
			],
			"greeting": "Hello, Moody Duncan! You have 9 unread messages.",
			"favoriteFruit": "banana"
		},
		{
			"_id": "6636e0438aa0e021cfd86611",
			"index": 2,
			"guid": "1d6e9bda-0a31-4864-ad70-2fed16999380",
			"isActive": true,
			"balance": "$1,910.08",
			"picture": "http://placehold.it/32x32",
			"age": 39,
			"eyeColor": "blue",
			"name": "Carole Wyatt",
			"gender": "female",
			"company": "SNACKTION",
			"email": "carolewyatt@snacktion.com",
			"phone": "+1 (904) 474-3559",
			"address": "383 Nixon Court, Belvoir, Illinois, 7525",
			"about": "Non cupidatat culpa duis incididunt mollit. Est irure duis ut quis officia ea sit reprehenderit proident ad nulla. Tempor nisi laborum quis non eu occaecat aliquip. Dolore anim consequat ea laboris do dolore laboris ex dolore officia tempor nisi irure do.\r\n",
			"registered": "2017-12-13T02:18:04 -09:00",
			"latitude": -19.106743,
			"longitude": -15.102964,
			"tags": [
				"voluptate",
				"cillum",
				"ullamco",
				"elit",
				"eiusmod",
				"quis",
				"labore"
			],
			"friends": [
				{
					"id": 0,
					"name": "Patterson Callahan"
				},
				{
					"id": 1,
					"name": "Tanisha Key"
				},
				{
					"id": 2,
					"name": "Kathie Carroll"
				}
			],
			"greeting": "Hello, Carole Wyatt! You have 1 unread messages.",
			"favoriteFruit": "banana"
		},
		{
			"_id": "6636e04313862a26fc0407fb",
			"index": 4,
			"guid": "dacacda2-4a4a-496d-9b5a-fabd5c0c600d",
			"isActive": true,
			"balance": "$2,754.82",
			"picture": "http://placehold.it/32x32",
			"age": 30,
			"eyeColor": "brown",
			"name": "Castro Stevenson",
			"gender": "male",
			"company": "PANZENT",
			"email": "castrostevenson@panzent.com",
			"phone": "+1 (972) 542-2441",
			"address": "516 Aster Court, Taycheedah, North Dakota, 9377",
			"about": "Et nostrud tempor id et occaecat commodo ad fugiat enim magna velit qui ex nostrud. Minim commodo in voluptate consequat duis occaecat velit consequat laboris et. Sunt sit ullamco dolor enim dolore esse deserunt voluptate eiusmod aliqua. Aliqua dolor consequat consequat et commodo aute amet cillum proident velit magna. Labore esse officia proident et ullamco nulla. Dolore proident velit labore ad cupidatat. Adipisicing velit aliqua velit cillum excepteur ullamco eiusmod laborum.\r\n",
			"registered": "2023-04-25T09:50:40 -09:00",
			"latitude": 3.775112,
			"longitude": -170.248202,
			"tags": [
				"dolore",
				"in",
				"id",
				"id",
				"laboris",
				"in",
				"consequat"
			],
			"friends": [
				{
					"id": 0,
					"name": "Elaine Roach"
				},
				{
					"id": 1,
					"name": "Allyson Whitaker"
				},
				{
					"id": 2,
					"name": "Juanita Solomon"
				}
			],
			"greeting": "Hello, Castro Stevenson! You have 10 unread messages.",
			"favoriteFruit": "apple"
		},
		{
			"_id": "6636e043240e1670126a03b6",
			"index": 5,
			"guid": "3a20ab87-df6c-49a7-ab44-dd299439d733",
			"isActive": false,
			"balance": "$3,457.86",
			"picture": "http://placehold.it/32x32",
			"age": 35,
			"eyeColor": "brown",
			"name": "Suarez Nunez",
			"gender": "male",
			"company": "INRT",
			"email": "suareznunez@inrt.com",
			"phone": "+1 (984) 555-3946",
			"address": "874 Cumberland Walk, Dunbar, Minnesota, 8376",
			"about": "Cupidatat cillum enim velit mollit non cupidatat ullamco ex voluptate est officia. Ea id voluptate excepteur irure deserunt magna sit ipsum nulla. Id in cillum anim minim duis laboris proident. Excepteur cupidatat ea adipisicing consectetur in non voluptate eu. Reprehenderit anim consequat eu pariatur consectetur aliqua ipsum ad pariatur proident minim aliqua amet ullamco. Officia magna anim minim esse mollit minim deserunt.\r\n",
			"registered": "2021-09-17T08:54:45 -09:00",
			"latitude": 16.307274,
			"longitude": 121.547327,
			"tags": [
				"amet",
				"irure",
				"ipsum",
				"cillum",
				"ad",
				"eu",
				"aliqua"
			],
			"friends": [
				{
					"id": 0,
					"name": "Robbie Mckenzie"
				},
				{
					"id": 1,
					"name": "Bryant Barry"
				},
				{
					"id": 2,
					"name": "Eve Hatfield"
				}
			],
			"greeting": "Hello, Suarez Nunez! You have 6 unread messages.",
			"favoriteFruit": "strawberry"
		}
	])
	return {

	};
};
